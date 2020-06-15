package Admin;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Luís Badalo
 */
public class RegisterUnsuccessfull {

    WebDriver driver;

    public RegisterUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    public void registerUnsuccessfully() {
        try {
            //Anónimo
            Thread.sleep(5000);
            driver.findElement(By.linkText("Registo")).click();
            Thread.sleep(2000);
            driver.findElement(By.name("name")).click();
            driver.findElement(By.name("name")).sendKeys("");
            Thread.sleep(500);
            driver.findElement(By.name("email")).click();
            driver.findElement(By.name("email")).sendKeys("aaa1@gmail.com");
            Thread.sleep(500);
            driver.findElement(By.name("password")).click();
            driver.findElement(By.name("password")).sendKeys("aaa1");
            Thread.sleep(500);
            //Procura pela segundo caixa de texto da password
            driver.findElement(By.name("password_confirmation")).click();
            driver.findElement(By.name("password_confirmation")).sendKeys("aaa1");
            Thread.sleep(500);
            //Carrega no botão
            driver.findElement(By.xpath("//button[.='Sign Up']")).click();
            Thread.sleep(500);
            driver.findElement(By.xpath("//button[.='Sign Up']")).click();
            Thread.sleep(3000);
            //Warnings na página
            WebElement classe = driver.findElement(By.className("alert-warning"));
            Assert.assertEquals(true, classe.isDisplayed());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
