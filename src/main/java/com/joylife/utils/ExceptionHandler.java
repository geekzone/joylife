package com.joylife.utils;

/**
 * Created with IntelliJ IDEA.
 * User: lihan
 * Date: 13-10-23
 * Time: 下午6:32
 * To change this template use File | Settings | File Templates.
 */

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ExceptionHandler implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {

        ModelAndView view =  new ModelAndView("error");
        view.addObject("errormsg",ex.getMessage());
        view.addObject("ex", ex.getClass().getSimpleName());
        ex.printStackTrace();
        return view;
    }

}