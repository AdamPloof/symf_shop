<?php

namespace App\Controller;

use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    /**
     * @Route("/product-create", name="create_products")
     */
    public function createProduct(Request $request)
    {
        // Add n random products to the db where n is "cnt" param
        $manager = $this->getDoctrine()->getManager();
        $new_products = array();

        if (!$request->query->get('cnt')) {
            $cnt = 1;
        } else {
            $cnt = $request->query->get('cnt');
        }

        for ($i = 0; $i < $cnt; $i++) {
            
            $product = new Product;
            $rand_item = getRandomItem();
            $price = getRandomPrice();

            $product->setName($rand_item);
            $product->setSize(rand(1, 6));
            $product->setPrice($price);
    
            $manager->persist($product);
            $manager->flush();

            $new_products[] = $product;
        }
        
        return $this->render('product/create_products.html.twig', [
            'count' => $cnt, "products" => $new_products 
        ]);
    }
}


function getRandomItem()
{
    // Get an list of random items
    $file_str = file_get_contents("/Users/mac/Symfony_Projects/symf_shop/src/Resources/items.json");
    $items = json_decode($file_str, true);
    $idx = rand(0, count($items["items"]));
    $rand_item = $items["items"][$idx];

    return $rand_item;
}


function getRandomPrice() {
    $rough_price = rand(100, 100000);
    $price = $rough_price + (99 - ($rough_price % 100));
    return $price;
}