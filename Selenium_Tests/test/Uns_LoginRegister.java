/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Uns_LoginRegister {

    WebDriver driver;

    public Uns_LoginRegister() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test

    public void FailedLoginRegister() {

        driver.quit();
    }
}
