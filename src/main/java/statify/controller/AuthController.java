package statify.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @GetMapping("/")
    public String welcome() {
        return "Welcome to Statify";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Dashboard coming soon";
    }
}