<%-- 
    Document   : summary_movie
    Created on : 23 May, 2009, 6:06:38 PM
    Author     : gopi
--%>

<%@ include file="../common/include.jsp" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <LINK href="../gui/css/cmm.css" type="text/css" rel="stylesheet">
        <LINK href="../gui/css/cmm_table.css" type="text/css" rel="stylesheet">
        <script type="text/javascript" src="../gui/js/cmm_table.js"></script>
        <title>GStudio - Movie Library Summary</title>
    </head>
    <body>
        <jsp:include page="../common/header.jsp" />
        
        <table class="pickme" width="100%" cellpadding="1" cellspacing="1">
            <tr>
                <td colspan="5">Zee Library Movie Studio</td>
                <td align="right"><input type="button" name="cmdAdd" style="cursor: hand;" value="Add Movie" onclick="javascript: document.location='add_movie.htm';" /></td>
            </tr>
            <tr>
                <th width="4%">S.No</th>
                <th width="56%">Title</th>
                <th width="12%">Media Type</th>
                <th width="10%">Language</th>
                <th width="5%">Certificate</th>
                <th width="1%">5.1</th>
                <th width="12%">Actions</th>
            </tr>
            <c:forEach var="row" items="${movies}" varStatus="status">
                <tr>
                    <td>${status.count}</td>
                    <td>${row.movieName}</td>
                    <td>${row.mediaType}</td>
                    <td>${row.language}</td>
                    <td>${row.certificate}</td>
                    <td>
                        <c:choose>
                            <c:when test="${row.is5_1}">
                                <img src="../gui/icons/fam/check.png" />
                            </c:when>
                            <c:otherwise>
                                &nbsp;
                            </c:otherwise>
                        </c:choose>
                    </td>
                    <td>
                        <a href="edit_movie.htm?id=${row.movieId}">Edit</a> |
                        <a href="delete_movie.htm?id=${row.movieId}">Delete</a>
                    </td>
                </tr>
            </c:forEach>
        </table>

        <table>
            <tr>
                <td><input type="button" name="cmdAdd" style="cursor: hand;" value="Add Movie" onclick="javascript: document.location='add_movie.htm';" /></td>
            </tr>
            <c:if test="${!empty param.status}">
                <tr>
                    <td class="topshadow" style="padding-left:10px">
                        <spring:message code="summary_movie.msg.${param.status}" />
                    </td>
                </tr>
            </c:if>
        </table>
    </body>
</html>
