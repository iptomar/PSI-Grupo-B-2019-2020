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
 * @author Luis Badalo
 */
public class UserPoints {
    WebDriver driver;
    
    public UserPoints(WebDriver driver) {
        this.driver = driver;
    }
    
    public void UserListPoints() {
        try {
            driver.findElement(By.xpath("//a[.='Pontos De Interesse']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Detalhes']")).click();
             Thread.sleep(500);
              //Confirmacao ULR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("detalhes"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
