package cn.ithc.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author iamyjx
 * @since 2019/7/2
 */
@Controller
public class IndexController {

    @GetMapping("/")
    public String index(){
        return "index";
    }
}
