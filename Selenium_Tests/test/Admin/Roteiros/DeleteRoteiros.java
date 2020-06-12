/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Roteiros;

import Admin.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Tomás Barros
 */
public class DeleteRoteiros {
    WebDriver driver;
    
    public DeleteRoteiros(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void DeletedRoteiros() {
         try {
            //Ir para Roteiros
             Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
              Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
             //Confirmacao ULR
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true,title.contains("Routes"));
        }  catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
