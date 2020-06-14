package Admin;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;

/**
 *
 * @author Luís Badalo
 */
public class RegisterSuccess {
    WebDriver driver;
    
    public RegisterSuccess(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void registerSuccessfully() {
         try {
             //Anónimo
             Thread.sleep(5000);
             driver.findElement(By.linkText("Create")).click();
            Thread.sleep(2000);
             driver.findElement(By.name("name")).click();
             driver.findElement(By.name("name")).sendKeys("Luis");
             Thread.sleep(500);
             driver.findElement(By.name("email")).click();
             driver.findElement(By.name("email")).sendKeys("aaa@gmail.com");
             Thread.sleep(500);
             driver.findElement(By.name("password")).click();
             driver.findElement(By.name("password")).sendKeys("aaa");
             Thread.sleep(500);
             //Procura pela segundo caixa de texto da password
             driver.findElement(By.name("password_confirmation")).click();
             driver.findElement(By.name("password_confirmation")).sendKeys("aaa");
             Thread.sleep(500);
             //Procura pela segundo caixa de texto da password
             driver.findElement(By.xpath("//button[.='Sign Up']")).click();
             Thread.sleep(2000);
             String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("users"));
         } catch (Exception e) {
             System.out.println(e.getMessage());
         }
     }
}
