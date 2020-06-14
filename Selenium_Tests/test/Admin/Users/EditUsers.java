/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Users;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Tomás Barros
 */
public class EditUsers {
    WebDriver driver;
    
    public EditUsers(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void EditedUsers() {
         try {
            //Ir para Authors
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Users']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            WebElement username = driver.findElement(By.id("name"));
            driver.findElement(By.id("name")).clear();
            Thread.sleep(500);
            username.sendKeys("SeleniumTest23");
            WebElement mail = driver.findElement(By.id("email"));
            driver.findElement(By.id("email")).clear();
            Thread.sleep(500);
            mail.sendKeys("SeleniumTest23@selenium.com");
            WebElement role = driver.findElement(By.id("role"));
            driver.findElement(By.id("role")).clear();
            Thread.sleep(500);
            role.sendKeys("superadmin");
            WebElement pass = driver.findElement(By.id("password"));
            driver.findElement(By.id("password")).clear();
            Thread.sleep(500);
            pass.sendKeys("password");
            WebElement repass = driver.findElement(By.id("password_confirmation"));
            driver.findElement(By.id("password_confirmation")).clear();
            Thread.sleep(500);
            repass.sendKeys("password");
            Thread.sleep(2000);
            //driver.findElement(By.xpath("//button[.='Update']")).click();
            //aceitar alerta
            //driver.switchTo().alert().accept();
             //ARRANJAR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("users"));
        } catch (Exception e) {
             System.out.println(e.getMessage());
        }
    }
}
