package Admin.Points;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import Testes.Login.Capabilities.Capabilities;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Luís Badalo
 */
public class CreatePoint {
    WebDriver driver;
    
    public CreatePoint(WebDriver driver) {
        this.driver = driver;
    }
    
    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
     public void PointInterest() {
        try {
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Criar Pontos de Interesse']")).click();
            Thread.sleep(2000);
            WebElement nome = driver.findElement(By.name("buildingName"));
            nome.sendKeys("Edificio1");
            WebElement localizacao = driver.findElement(By.name("location"));
            localizacao.sendKeys("Tomar");
            WebElement data = driver.findElement(By.name("dates"));
            data.sendKeys("1974");
            WebElement tipo = driver.findElement(By.name("buildingType"));
            tipo.sendKeys("Museu");
            WebElement descricao = driver.findElement(By.id("description"));
            descricao.sendKeys("descrição do edificio");
            WebElement cordenada1 = driver.findElement(By.name("coordinate1"));
            cordenada1.sendKeys("20");
            WebElement cordenada2 = driver.findElement(By.name("coordinate2"));
            cordenada2.sendKeys("30");
            WebElement foto = driver.findElement(By.className("custom-file-input"));
            foto.sendKeys("C:\\Users\\LuisBadalo\\Desktop\\Screenshot_1.png");
            WebElement source_author = driver.findElement(By.name("source_author"));
            source_author.sendKeys("Autor");
            WebElement description_images = driver.findElement(By.name("description_images"));
            description_images.sendKeys("descrição da imagem");
            
            driver.findElement(By.xpath("//button[.='Add image']")).click();
            Thread.sleep(5000);
            WebElement teste = driver.findElement(By.id("react-select-2-input"));
            teste.sendKeys("aa");
            Thread.sleep(5000);
            
            teste.sendKeys(Keys.RETURN);
            WebElement c1 = driver.findElement(By.name("coordenada1"));
            c1.sendKeys("1");
            WebElement c2 = driver.findElement(By.name("coordenada2"));
            c2.sendKeys("2");
            
            WebElement order = driver.findElement(By.name("order"));
            order.sendKeys("1");
            
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            c1.sendKeys("1");
            c2.sendKeys("2");
            
            order.sendKeys("2");
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            
            c1.sendKeys("1");
            c2.sendKeys("2");
            
            order.sendKeys("3");
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            
            driver.findElement(By.xpath("//button[.='Submit']")).click();
              //Confirmacao ULR
            String title = driver.getCurrentUrl();
             Assert.assertEquals(true,title.contains("PointsOfInterest"));
        } catch (InterruptedException ex) {
            Logger.getLogger(CreatePoint.class.getName()).log(Level.SEVERE, null, ex);
        }
     }
}
