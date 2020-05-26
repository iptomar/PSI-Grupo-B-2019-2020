/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Roteiros;

import Admin.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Tomás Barros
 */
public class ListRoteiros {
    WebDriver driver;
    
    public ListRoteiros(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void ListedRoteiros() {
         try {
            //Ir para Authors
            Thread.sleep(500);
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
