package AaSucess;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Admin.LoginSuccess;
import Admin.Points.CreatePoint;
import Admin.Points.DeletePoint;
import Admin.Points.DetailsPoint;
import Admin.Points.EditPoint;
import Testes.Login.Capabilities.Capabilities;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class Login_Points {

    WebDriver driver;

    public Login_Points() {
        this.driver = new Capabilities().getDriver();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test

    public void PointsTest() {
        new LoginSuccess(driver).loginSucessfully();
        new CreatePoint(driver).PointInterest();
        new DetailsPoint(driver).DetailedPoints();
        new EditPoint(driver).EditedPoints();
        new DeletePoint(driver).DeletedPoint();
        driver.quit();
    }
}
