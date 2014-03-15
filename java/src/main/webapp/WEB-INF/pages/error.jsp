<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix='fn' uri='http://java.sun.com/jsp/jstl/functions'%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
    <title>出错了！</title>
    <meta charset="utf-8" />
    <%@ include file="./include/common.jsp"%>
</head>
<body onkeydown="if(event.keyCode==13) return false;">
<div class="container">
<h3>抱歉！你的请求没能完成，具体原因：${errormsg}</h3>
 <br><a href="javascript:history.back()">点此返回</a>
</div>

<%@ include file="./include/bottom.jsp"%>
</body>
</html>