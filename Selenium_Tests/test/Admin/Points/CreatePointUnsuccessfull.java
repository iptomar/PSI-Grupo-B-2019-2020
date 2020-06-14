/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Admin.Points;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/**
 *
 * @author Antonio Rodrigues
 */
public class CreatePointUnsuccessfull {
    WebDriver driver;
    
    public CreatePointUnsuccessfull(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void PointInterestUnsuccessfull() {
        try {
            Thread.sleep(1000);
            driver.findElement(By.xpath("//a[.='Criar Pontos de Interesse']")).click();
            //driver.findElement(By.linkText("Login")).click();
            Thread.sleep(2000);
            WebElement nome = driver.findElement(By.name("buildingName"));
            nome.sendKeys("");
            WebElement localizacao = driver.findElement(By.name("location"));
            localizacao.sendKeys("");
            WebElement data = driver.findElement(By.name("dates"));
            data.sendKeys("");
            WebElement tipo = driver.findElement(By.name("buildingType"));
            tipo.sendKeys("");
            WebElement descricao = driver.findElement(By.id("description"));
            descricao.sendKeys("");
            WebElement cordenada1 = driver.findElement(By.name("coordinate1"));
            cordenada1.sendKeys("");
            WebElement cordenada2 = driver.findElement(By.name("coordinate2"));
            cordenada2.sendKeys("");
            WebElement foto = driver.findElement(By.className("custom-file-input"));
            //MUDAR FOTO
            foto.sendKeys("C:\\Users\\LuisBadalo\\Desktop\\Screenshot_1.png");
            WebElement source_author = driver.findElement(By.name("source_author"));
            source_author.sendKeys("");
            WebElement description_images = driver.findElement(By.name("description_images"));
            description_images.sendKeys("");
            
            driver.findElement(By.xpath("//button[.='Add image']")).click();
            Thread.sleep(5000);
            WebElement teste = driver.findElement(By.id("react-select-2-input"));
            teste.sendKeys("");
            
            Thread.sleep(5000);
            teste.sendKeys(Keys.RETURN);
            
            
            WebElement c1 = driver.findElement(By.name("coordenada1"));
            c1.sendKeys("");
            WebElement c2 = driver.findElement(By.name("coordenada2"));
            c2.sendKeys("");
            
            WebElement order = driver.findElement(By.name("order"));
            order.sendKeys("");
            
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            Thread.sleep(1000); 
            c1.sendKeys("");
            c2.sendKeys("");
            
            order.sendKeys("");
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            Thread.sleep(1000);
            c1.sendKeys("");
            c2.sendKeys("");
            
            order.sendKeys("");
            
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(1000);
            
             //Confirmacao ULR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("CreatePointsOfInterest"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
     }
}
