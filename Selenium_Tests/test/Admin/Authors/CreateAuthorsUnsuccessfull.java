/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Authors;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Antonio Rodrigues
 */
public class CreateAuthorsUnsuccessfull {
     WebDriver driver;
    public CreateAuthorsUnsuccessfull(WebDriver driver) {
      this.driver  = driver;
    }
    public void AddAuthorsUnsuccessfull() {
        try {
            //Ir para create authors
            Thread.sleep(1000);
            driver.findElement(By.xpath("//a[.='Criar Autores']")).click();
            Thread.sleep(500);
            WebElement autor = driver.findElement(By.className("form-control"));
            autor.sendKeys("");
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            driver.switchTo().alert().accept();
            Thread.sleep(5000);
             //ARRANJAR
            String title = driver.getCurrentUrl();
           // WebElement classe = driver.findElement(By.className("alert alert-warning"));
           
             if(title.contains("CreateAuthors")){
                 System.out.println("Autor não criado");
             }else{
                 throw new Exception("Autor Criado com sucesso");
             }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
