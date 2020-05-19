/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin;

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
public class EditUsers {
    public static void main(String[] args) {
        try {
            System.setProperty("webdriver.chrome.driver","D:\\GithubNAOMEXER\\jars\\chromedriver.exe");
            WebDriver driver = new ChromeDriver();
            driver.get("http://front.psi2020.tugamars.com/login2");
            WebElement email = driver.findElement(By.id("email"));
            email.sendKeys("admin@admin.com");
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("password");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Login']")).click();
            //Ir para Authors
            Thread.sleep(500);
            driver.findElement(By.xpath("//a[.='Users']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            WebElement username = driver.findElement(By.id("name"));
            driver.findElement(By.id("name")).clear();
            Thread.sleep(500);
            username.sendKeys("SeleniumTest2");
            WebElement mail = driver.findElement(By.id("email"));
            driver.findElement(By.id("email")).clear();
            Thread.sleep(500);
            mail.sendKeys("SeleniumTest2@selenium.com");
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
            Thread.sleep(500);
            //driver.findElement(By.xpath("//button[.='Update']")).click();
            //aceitar alerta
            //driver.switchTo().alert().accept();
        } catch (InterruptedException ex) {
            Logger.getLogger(EditUsers.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
