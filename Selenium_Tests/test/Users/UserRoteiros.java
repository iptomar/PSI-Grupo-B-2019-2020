/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Users;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class UserRoteiros {

    WebDriver driver;

    public UserRoteiros(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    public void UserListRoteiros() {
        try {

            //Ir para Roteiros
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
            Thread.sleep(2000);
            //Confirmacao ULR
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("Routes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
