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
//comment the above line and uncomment below line to use Chrome
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Tomás Barros
 */
public class CreateAuthors {
    public static void main(String[] args){
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
            //Ir para create authors
            Thread.sleep(500);
            driver.findElement(By.xpath("//a[.='Create Authors']")).click();
            Thread.sleep(500);
            WebElement autor = driver.findElement(By.className("form-control"));
            autor.sendKeys("SeleniumTest1");
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
        } catch (InterruptedException ex) {
            Logger.getLogger(CreateAuthors.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
