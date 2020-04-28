package Admin;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import Testes.Login.Capabilities.Capabilities;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 *
 * @author Luís Badalo
 */
public class LoginSuccess {
    WebDriver driver;
    
    public LoginSuccess(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void loginSucessfully() {
         try {
            Thread.sleep(5000);
            driver.findElement(By.linkText("Login")).click();
            Thread.sleep(2000);
             String url = driver.getCurrentUrl();
             Assert.assertEquals(true,url.contains("login"));
             driver.findElement(By.name("email")).click();
             driver.findElement(By.name("email")).sendKeys("admin@admin.com");
             Thread.sleep(500);
             driver.findElement(By.name("password")).click();
             driver.findElement(By.name("password")).sendKeys("password");
             Thread.sleep(500);
             //Influência o type
             driver.findElement(By.xpath("//button[.='Login']")).click();
             Thread.sleep(1000);
             String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("home"));
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
     }
}
