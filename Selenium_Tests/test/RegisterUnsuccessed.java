/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Testes.Login.Capabilities.Capabilities;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.junit.Test;
import org.openqa.selenium.By;

/**
 *
 * @author Luís Badalo
 */
public class RegisterUnsuccessed {
    WebDriver driver;
    
    public RegisterUnsuccessed() {
      
    }
    
    @BeforeEach
    public void setUp() {
        this.driver = new Capabilities().getDriver();
        
    }
    
    @AfterEach
    public void tearDown() {
        driver.close();
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     @Test
     public void LoginTeste02() {
         try {
             //Anónimo
             Thread.sleep(5000);
             driver.findElement(By.name("firstname")).click();
             driver.findElement(By.name("firstname")).sendKeys("Luis");
             Thread.sleep(500);
             driver.findElement(By.name("lastname")).click();
             driver.findElement(By.name("lastname")).sendKeys("Badalo");
             Thread.sleep(500);
             driver.findElement(By.name("email")).click();
             driver.findElement(By.name("email")).sendKeys("aaa@gmail.com");
             Thread.sleep(500);
             driver.findElement(By.name("password")).click();
             driver.findElement(By.name("password")).sendKeys("aaa");
             Thread.sleep(500);
             //Procura pela segundo caixa de texto da password
             driver.findElement(By.xpath("(//*[@name='password'])[2]")).click();
             driver.findElement(By.xpath("(//*[@name='password'])[2]")).sendKeys("aaa");
             Thread.sleep(500);
             //Procura pela segundo caixa de texto da password
             driver.findElement(By.name("create")).click();
             Thread.sleep(5000);
             //TODO
             //FrontEnd Errors
             //Register User Already registered
             
             
         } catch (Exception e) {
             System.out.println(e.getMessage());
         }
     }
}
