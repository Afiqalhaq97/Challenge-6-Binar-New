var createError = require('http-errors');
const express = require('express');
const loginRouter = require('./routes/login')
const app = express();
const database = require('./config/database')
const dashboardRouter = require('./routes/dashboard')
const addDataRouter = require('./routes/add')
const deleteDataRouter = require('./routes/delete')
const editDataRouter = require('./routes/edit')

// Using EJS
app.set('view engine', 'ejs')

// Using Body Parser
app.use(express.urlencoded({ extended: true }))

// Set for static file
app.use(express.static('public'))

app.use('/admin', deleteDataRouter);

app.use('/admin', loginRouter);
app.use('/admin', dashboardRouter);
app.use('/admin', addDataRouter);
app.use('/admin', editDataRouter);

// 404 Middleware
app.use(function(req, res, next) {
    next(createError(404));
});
  
// Set ENV and Error Handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Handling Error 500
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
