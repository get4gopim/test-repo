<%-- 
    Document   : login
    Created on : Apr 11, 2008, 10:38:30 AM
    Author     : gopimani
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<HTML>
    <HEAD>
        <TITLE><spring:message code="login.title"/></TITLE>
        <META http-equiv=Content-Type content="text/html; charset=UTF-8">
        <LINK href="/gui/css/login.css" type="text/css" rel="stylesheet">
        <script src="/gui/js/cmm.js" type="text/javascript"></script>
        <STYLE type="text/css">
            #lgtb TD {
                text-align: left;
            }
            #lgtb TD INPUT {
                font-size: 11px; 
                width: 110px; 
                font-family: Verdana, Arial, Helvetica, sans-serif
            }
        </STYLE>
        
        <SCRIPT language=javascript>
            
            function redirectLogin() {
                var domain = parent.document.getElementById("cmbdomain");
                if (domain != null) {
                    //alert (domain.value)
                    parent.parent.location = "login.htm";
                }
            }
                function addLoadEvent(func) {
                    if (typeof window.onload != 'function') {
                        func(); // overloading page load method                   
                    } else {
                        window.onload = function() {
                            // after page loads
                        }
                    }
                    }
                        addLoadEvent(redirectLogin)
            
                        function initialize(){
                            document.getElementById("j_username").focus(); 
                        }
        
                        function validateLogin(e) {
                            var uname = document.getElementById("j_username")
                            var pwd = document.getElementById("j_password")
                            //alert (uname + pwd)
                            //if (uname == "admin" && pwd == "admin") { 
                            if (!isEmpty("username", uname)) {
                                uname.focus();
                                return false;
                            }
                
                            if (!isEmpty("password", pwd)) {
                                pwd.focus();
                                return false;
                            }
                
                            e.returnValue = true;
                            return true;
                        }
        </SCRIPT>
        
        <META content="MSHTML 6.00.2900.3243" name=GENERATOR>
    </HEAD>
    <BODY onload="initialize();"><BR><BR><BR><BR>
        
        <div align="center">
            <c:if test="${!empty param.login_error}">
                <h4><font color="red"><spring:message text="Invalid Login please try again"/></font></h4> 
            </c:if>
        </div>
        
        <form action="login.htm" method="post">
            <TABLE class="bgImage" height="202" cellSpacing="0" cellPadding="0" align="center"
                   border="0">
                <TBODY>
                    <TR>
                        <TD vAlign=top align=left width=18></TD>
                        <TD vAlign=top align=left width=202></TD>
                        <TD align=right colSpan=2 height=130></TD>
                        <TD vAlign=top width=42></TD>
                    </TR>
                    <TR>
                        <TD vAlign=top align=left width=18></TD>
                        <TD vAlign=top align=left colSpan=2><BR><BR>
                            <FONT color=white size=2></FONT>
                        </TD>
                        <TD vAlign=top width=169 height=60>
                            <TABLE id=lgtb summary="form: login information">
                                <TBODY>
                                    <TR>
                                        <TH>
                                            <LABEL for="username">
                                                <SPAN class="textStyle"><fmt:message key="login.in_table.username"/>:</SPAN>
                                            </LABEL>
                                        </TH>
                                       
                                        <TD>
                                            <INPUT type="text" name="j_username" id="j_username"  autocomplete='off' VALUE="${status.value}" />
                                        </TD>
                                        
                                    </TR>
                                    <TR>
                                        <TH>
                                            <LABEL for="password">
                                                <SPAN class="textStyle"><spring:message code="login.in_table.password"/>:</SPAN>
                                            </LABEL>
                                        </TH>
                                        
                                        <TD>
                                            <INPUT type="password" name="j_password" id="j_password" value="${status.value}" />
                                        </TD>
                                        
                                    </TR>
                                    <TR>
                                        
                                        <TH COLSPAN="2" ALIGN="LEFT">
                                            <LABEL for="password">
                                                <SPAN class="textStyle">Remember me: <input type="checkbox" name="_acegi_security_remember_me" value="true" <c:if test="${status.value}">checked</c:if> /></SPAN>
                                            </LABEL>                                            
                                        </TH>
                                        
                                    </TR>
                                </TBODY>
                            </TABLE>
                            <INPUT type="hidden" value="LOGIN" name="operation_type"> 
                        <P><INPUT id="Submit" name="Submit" type="submit" value="Login" ONCLICK="validateLogin(event)"> </P></TD>
                        <TD vAlign=top width=42></TD>
                    </TR>
                    <!---->
                    <TR>
                        <TD vAlign=top align=left width=18></TD>
                        <TD vAlign=top align=left width=202></TD>
                        <TD vAlign=top align=left width=100></TD>
                        <TD vAlign=top width=169 height=110><IMG height=1 alt="" 
                                                                 src="Login_files/transparent.gif" width=167> </TD>
            <TD vAlign=top width=42></TD></TR></TBODY></TABLE>
        </form>
        
    </BODY>
    
</HTML>