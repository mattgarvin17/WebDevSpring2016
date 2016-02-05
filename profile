<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile</title>

    <!-- Link to jQuery CDN -->
    <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>

    <!-- Link to Bootstrap CDN -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

    <!-- Link to stylesheet -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"/>

    <!-- dashboard stylesheet -->
    <link href="http://getbootstrap.com/examples/dashboard/dashboard.css" rel="stylesheet">

</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"                      aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Form Maker</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/register">Register</a></li>
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/login">Login</a></li>
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/username">Username</a></li>
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/logout">Logout</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/home">Home</a></li>
                <li  class="active"><a href="http://webdev2016-garvinmatt.rhcloud.com/profile">Profile<span class="sr-only">(current)</span></a></li>
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/admin">Admin</a></li>
                <li><a href="http://webdev2016-garvinmatt.rhcloud.com/forms">Forms</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <h1 class="page-header">Profile</h1>

    <form class="form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail3" placeholder="Username">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">First Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputPassword3" placeholder="First Name">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Last Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputPassword3" placeholder="Last Name">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="Email" class="form-control" id="inputPassword3" placeholder="Email">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <a class="btn btn-success col-sm-12" href="http://webdev2016-garvinmatt.rhcloud.com/profile">Update</a>
            </div>
        </div>
    </form>
</div>

</body>
</html>
