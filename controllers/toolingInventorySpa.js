
exports.getToolingInventorySPA = (req, res) => {
  res.sendfile('index.html', { root: __dirname + '/../views/job-app/dist' }); 
};

