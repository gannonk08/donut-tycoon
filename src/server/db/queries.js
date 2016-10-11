function deleteEmployee(employeeID) {
  knex('employee')
  .del()
  .where('id', employeeID)
  .returning('*')
  .then((results) => {
    console.log(results);
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: 'Employee is gone!'
      });
      res.redirect('/')
    } else {
      res.status(404).json({
        status: 'errror',
        message: 'That Employee does not exist'
      });
      res.redirect('/')
    }
  })
}
module.exports = {
  deleteEmployee: deleteEmployee;
}
