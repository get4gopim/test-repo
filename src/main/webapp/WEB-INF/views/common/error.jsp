<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@page isErrorPage="true"%>

<%--
The taglib directive below imports the JSTL library. If you uncomment it,
you must also add the JSTL library to the project. The Add Library... action
on Libraries node in Projects view can be used to add the JSTL 1.1 library.
--%>
<%--
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
--%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Error Page</title>
        <style type="text/css" media="screen">        
                body {
                    margin:50px 0px; padding:0px; /* Need to set body margin and padding to get consistency between browsers. */
                    text-align:center; /* Hack for IE5/Win */
                }
                
                #content {
                    width:80%;
                    margin:0px auto; /* Right and left margin widths set to "auto" */
                    text-align:left; /* Counteract to IE5/Win Hack */
                    color: #ffffff;
                    padding:15px;
                    border:1px dashed #333;
                    /* border:1px solid #000; */
                    background-color:#363;
                }
        </style>
    </head>
    <body>

    <div id="content">
        <h4>Error Page</h4>
        <span style="width:90%" class="heading"><%=exception.toString()%></span>
    </div>
    
    </body>
</html>
