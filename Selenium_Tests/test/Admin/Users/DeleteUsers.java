/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Users;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Tomás Barros
 */
public class DeleteUsers {

    WebDriver driver;

    public DeleteUsers(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    public void DeletedUsers() {
        try {

            //Ir para os Users
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Users']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
            //aceitar alerta
            Thread.sleep(2000);
            driver.switchTo().alert().accept();
            Thread.sleep(5000);
            //URL Confirm
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("users"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
