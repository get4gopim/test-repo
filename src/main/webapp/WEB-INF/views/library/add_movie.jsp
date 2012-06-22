<%@page errorPage="../common/error.jsp"%>
<%@ include file="../common/include.jsp" %>

<HTML lang=en-US xml:lang="en-US" 
      xmlns="http://www.w3.org/1999/xhtml"><HEAD>
        <title><spring:message code="add_movie.title" /></title>
        <META http-equiv=Content-Type content="text/html; charset=iso-8859-1">
        <META content="MSHTML 6.00.2900.3314" name=GENERATOR>
        <LINK href="../gui/css/cmm.css" type="text/css" rel="stylesheet">
        <LINK href="../gui/css/cmm_table.css" type="text/css" rel="stylesheet">
        <script type="text/javascript" src="../gui/js/cmm.js"></script>
        <script type="text/javascript" src="../gui/js/cmm_table.js"></script>
        <script>
            function validate(form, e) {
                var movieName = form.movieName;
                var mediaType = form.mediaType;
                var certificate = form.certificate;
                var language = form.language;

                if (!isEmpty("Movie Name", movieName)) {
                    movieName.focus();
                    return false;
                }

                if (mediaType.value.indexOf("SELECT") != -1) {
                    alert ("Select Media Type")
                    return false;
                }
                if (language.value.indexOf("SELECT") != -1) {
                    alert ("Select Language")
                    return false;
                }
                if (certificate.value.indexOf("SELECT") != -1) {
                    alert ("Select Certificate")
                    return false;
                }

                readRadio(form);

                alert (movieName.value);

                e.returnValue = true;
                return true;
            }

            function readRadio(form) {
                //var cli = document.getElementById("_access");
                var rad_val;
                //alert ("leng: " + form._access.length)
                for (var i=0; i < form._access.length; i++)
                {
                    //alert ("val: " + form._access[i].value)
                    if (form._access[i].checked)
                    {
                        rad_val = form._access[i].value;
                    }
                }
                form.is5_1.value = rad_val;
                //alert ("ACCESS : " + rad_val);
            }

            function disableFields() {
                var edit = "<c:out value='${param.edit}' />";
                if (edit != "") {
                    document.frm.name.disabled=true;
                }
            }

            addLoadEvent(disableFields);
        </script>



    </HEAD>

    <BODY>
        <jsp:include page="../common/header.jsp" />

        <form name="frm" action="add_movie.htm" method="POST" onsubmit="">

            <table id="tab_domain_mgt" title="<spring:message code="add_movie.title" />"  class="pickme" class="tab" border="0" cellspacing="0" cellpadding="0" align="center" width="100%">
                <tbody>

                    <tr style="height: 25px; background-color: #CCCCCC;" class="tableHeader">
                        <td colspan="2"><img src="../gui/icons/fam/table_add.png" />&nbsp;&nbsp;<spring:message code="add_movie.heading" /></td>
                        <td align="right"><span class="error"><spring:message code="required" /> &nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                    </tr>

                    <spring:bind path="movie.movieName">
                        <tr>
                            <td class="side_tags" width="1%"><span class="error">*</span></td>
                            <td class="side_tags" width="20%"><spring:message code="add_movie.in_table.movieName" /></td>
                            <td class="side_components" width="79%">
                                <input type="text" name="${status.expression}" size="50" value="${status.value}" onfocus="true" />
                            </td>
                        </tr>
                    </spring:bind>

                    <spring:bind path="movie.movieId">
                        <input type="hidden" name="${status.expression}" size="3" value="${status.value}" />
                    </spring:bind>

                    <spring:bind path="movie.is5_1">
                        <tr>
                            <td class="side_tags" width="2%">&nbsp;</td>
                            <td class="side_tags">&nbsp;<spring:message code="add_movie.in_table.is5_1" /></td>
                            <td class="side_components">
                                <input type="hidden" name="_${status.expression}" value="false" />
                                <input type="checkbox" name="${status.expression}" value="true" <c:if test="${status.value}">checked</c:if> />
                            </td>
                        </tr>
                    </spring:bind>

                    <spring:bind path="movie.mediaType">
                        <tr>
                            <td class="side_tags" width="2%"><span class="error">*</span></td>
                            <td class="side_tags"><spring:message code="add_movie.in_table.mediaType" /></td>
                            <td class="side_components">
                                <select style="width:150px" name="${status.expression}" id="${status.expression}" >
                                    <option value="SELECT">--SELECT--</option>
                                    <c:forEach var="row" items="${mediaTypes}">
                                        <c:choose>
                                            <c:when test="${status.value == row}">
                                                <OPTION value="<c:out value='${row}' />" selected><c:out value='${row}' /></OPTION>
                                            </c:when>
                                            <c:otherwise>
                                                <OPTION value="<c:out value='${row}' />" ><c:out value='${row}' /></OPTION>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                    </spring:bind>

                    <spring:bind path="movie.language">
                        <tr>
                            <td class="side_tags" width="2%"><span class="error">*</span></td>
                            <td class="side_tags"><spring:message code="add_movie.in_table.language" /></td>
                            <td class="side_components">
                                <select style="width:150px" name="${status.expression}" id="${status.expression}" >
                                    <option value="SELECT">--SELECT--</option>
                                    <c:forEach var="row" items="${languages}">
                                        <c:choose>
                                            <c:when test="${status.value == row}">
                                                <OPTION value="<c:out value='${row}' />" selected><c:out value='${row}' /></OPTION>
                                            </c:when>
                                            <c:otherwise>
                                                <OPTION value="<c:out value='${row}' />" ><c:out value='${row}' /></OPTION>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                    </spring:bind>

                    <spring:bind path="movie.certificate">
                        <tr>
                            <td class="side_tags" width="2%"><span class="error">*</span></td>
                            <td class="side_tags"><spring:message code="add_movie.in_table.certificate" /></td>
                            <td class="side_components">
                                <select style="width:150px" name="${status.expression}" id="${status.expression}" >
                                    <option value="SELECT1">--SELECT--</option>
                                    <c:forEach var="row" items="${certs}">
                                        <c:choose>
                                            <c:when test="${status.value == row}">
                                                <OPTION value="<c:out value='${row}' />" selected><c:out value='${row}' /></OPTION>
                                            </c:when>
                                            <c:otherwise>
                                                <OPTION value="<c:out value='${row}' />" ><c:out value='${row}' /></OPTION>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </select>
                            </td>
                        </tr>
                    </spring:bind>

                    <tr style="background-color: #CCCCCC;" class="tableHeader">
                        <td colspan="3" align="left">
                            <input type="submit" style="cursor: hand;" name="_finish" value="Save" class="" onclick="javascript: return validate(this.form, event);" />
                            <input type="reset" style="cursor: hand;" />
                            <input type="submit" style="cursor: hand;" name="_cancel" value="Cancel" class="" />
                        </td>
                    </tr>
                </tbody>
            </table>

        </form>

    </BODY>
</HTML>
