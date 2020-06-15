package Admin;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Luís Badalo
 */
public class LoginUnsuccesfull {

    WebDriver driver;

    public LoginUnsuccesfull(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    public void loginUnsucessfully() {
        try {
            Thread.sleep(5000);
            driver.findElement(By.linkText("Login")).click();
            Thread.sleep(2000);
            String url = driver.getCurrentUrl();
            Assert.assertEquals(true, url.contains("login"));
            driver.findElement(By.name("email")).click();
            driver.findElement(By.name("email")).sendKeys("admin@admin.com");
            Thread.sleep(500);
            driver.findElement(By.name("password")).click();
            driver.findElement(By.name("password")).sendKeys("password");
            Thread.sleep(500);
            //Carregar botão Login
            driver.findElement(By.xpath("//button[.='Login']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Login']")).click();
            Thread.sleep(4000);
            WebElement classe = driver.findElement(By.className("alert-warning"));
            Assert.assertEquals(true, classe.isDisplayed());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
