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
public class EditRoteiros {
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
            driver.findElement(By.xpath("//a[.='Roteiros']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Editar']")).click();
            WebElement autor = driver.findElement(By.className("form-control"));
            //limpa o texto
            Thread.sleep(1000);
            driver.findElement(By.className("form-control")).clear();
            autor.sendKeys("SeleniumTest2");
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Apagar']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            
        } catch (InterruptedException ex) {
            Logger.getLogger(EditRoteiros.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
