package AaSucess;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.LoginSuccess;
import Admin.Roteiros.ApproveRoteiros;
import Admin.Roteiros.CreateRoteiros;
import Admin.Roteiros.DeleteRoteiros;
import Admin.Roteiros.DetailsRoteiros;
import Admin.Roteiros.EditRoteiros;
import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Login_Roteiros {

    WebDriver driver;

    public Login_Roteiros() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test

    public void RoteiroTest() {
        new LoginSuccess(driver).loginSucessfully();
        new CreateRoteiros(driver).AddRoteiros();
        new DetailsRoteiros(driver).DetailedRoteiros();
        new EditRoteiros(driver).EditedRoteiros();
        new ApproveRoteiros(driver).ApprovedRoteiros();
        new DeleteRoteiros(driver).DeletedRoteiros();
        driver.quit();
    }
}
