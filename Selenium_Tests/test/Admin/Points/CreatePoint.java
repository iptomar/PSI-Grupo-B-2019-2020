package Admin.Points;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

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
            driver.findElement(By.xpath("//a[.='Pontos De Interesse']")).click();
            Thread.sleep(2000);
            driver.findElement(By.xpath("//a[.='Criar Pontos de Interesse']")).click();
            Thread.sleep(2000);
            WebElement nome = driver.findElement(By.name("buildingName"));
            nome.sendKeys("AaEdificio");
            Thread.sleep(1000);
            WebElement localizacao = driver.findElement(By.name("location"));
            localizacao.sendKeys("Tomar");
            Thread.sleep(1000);
            WebElement data = driver.findElement(By.name("dates"));
            data.sendKeys("1974");
            Thread.sleep(1000);
            WebElement tipo = driver.findElement(By.name("buildingType"));
            tipo.sendKeys("Museu");
            Thread.sleep(1000);
            WebElement descricao = driver.findElement(By.id("description"));
            descricao.sendKeys("descrição do edificio");
            Thread.sleep(1000);
            WebElement cordenada1 = driver.findElement(By.name("coordinate1"));
            cordenada1.sendKeys("20");
            Thread.sleep(1000);
            WebElement cordenada2 = driver.findElement(By.name("coordinate2"));
            cordenada2.sendKeys("30");
            Thread.sleep(1000);
            WebElement foto = driver.findElement(By.className("custom-file-input"));
            //MUDAR FOTO
            foto.sendKeys("C:\\Users\\LuisBadalo\\Desktop\\Screenshot_1.png");
            Thread.sleep(1000);
            WebElement source_author = driver.findElement(By.name("source_author"));
            source_author.sendKeys("Autor");
            Thread.sleep(1000);
            WebElement description_images = driver.findElement(By.name("description_images"));
            description_images.sendKeys("descrição da imagem");
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Add image']")).click();
            Thread.sleep(5000);
            WebElement Autores = driver.findElement(By.id("react-select-2-input"));
            Autores.sendKeys("aa");
            Thread.sleep(5000);

            Autores.sendKeys(Keys.RETURN);
            WebElement c1 = driver.findElement(By.name("coordenada1"));
            c1.sendKeys("1");
            Thread.sleep(1000);
            WebElement c2 = driver.findElement(By.name("coordenada2"));
            c2.sendKeys("2");
            Thread.sleep(1000);
            WebElement order = driver.findElement(By.name("order"));
            order.sendKeys("1");
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            c1.sendKeys("1");
            Thread.sleep(1000);
            c2.sendKeys("2");
            Thread.sleep(1000);
            order.sendKeys("2");
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            c1.sendKeys("1");
            Thread.sleep(1000);
            c2.sendKeys("2");
            Thread.sleep(1000);
            order.sendKeys("3");
            driver.findElement(By.xpath("//button[.='Add vertice']")).click();
            Thread.sleep(1000);
            driver.findElement(By.xpath("//button[.='Submit']")).click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(6000);
            //Confirmacao ULR
            String title = driver.getCurrentUrl();
            Assert.assertEquals(true, title.contains("PointsOfInterest"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
