package com.joylife;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * User: lihan
 * Date: 14-2-23
 * Time: 下午5:27
 */
@Controller
public class IndexController {
    @RequestMapping(value = "/")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView("index");
        System.out.println("xxx");
        return mv;
    }
}
