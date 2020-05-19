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
public class CreateRoteiros {
    WebDriver driver;
    
    public CreateRoteiros(WebDriver driver) {
        this.driver = driver;
    }
 public void AddRoteiros() {
        try {
            //Ir para create authors
            Thread.sleep(500);
            driver.findElement(By.xpath("//a[.='Criar Roteiros']")).click();
            Thread.sleep(500);
            WebElement nomerota = driver.findElement(By.className("form-control"));
            nomerota.sendKeys("SeleniumTest1");
            driver.findElement(By.xpath("//button[.='Submit']")).click();
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
