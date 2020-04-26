<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ProductController extends AbstractController
{
    /**
     * @Route("/products", name="display_products") 
     */
    public function index()
    {
        return $this->render('product/products.html.twig');
    }

    /**
     * @Route("/products-list", name="list_products") 
     */
    public function listProducts()
    {
        $repo = $this->getDoctrine()->getRepository(Product::class);
        $products = $repo->findAll();

        return $this->json($products);
    }

    /**
     * @Route("/products-create", name="create_products")
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
            $rand_item = $this->getRandomItem();
            $price = $this->getRandomPrice();

            $product->setName($rand_item);
            $product->setSize(rand(1, 6));
            $product->setPrice($price);
    
            $manager->persist($product);
            $manager->flush();

            $new_products[] = $product;
        }

        return $this->json($new_products);
    }

    /**
     * @Route("/products-update/{id<\d+>}", name="update_products", methods={"POST"})
     */
    public function updateProduct($id, Request $request)
    {
        $manager = $this->getDoctrine()->getManager();
        $product = $this->getDoctrine()->getRepository(Product::class)->find($id);

        $updates = json_decode($request->getContent(), true);

        foreach ($updates as $k => $v ) {
            $this->updateProductProperty($product, $k, $v);
        }

        $manager->persist($product);
        $manager->flush();

        return $this->json($product);
    }

    private function updateProductProperty(&$product, $k, $v)
    {
        // Update the property of a product based on given key
        // TODO: add validation to check that proper update values are provided
        if ($k == 'name') {
            // Update name
            $product->setName($v);
        } elseif ($k == 'size') {
            // Update size
            $product->setSize($v);
        } elseif ($k == 'price') {
            // Update price
            $product->setPrice($v);
        } else {
            return;
        }
    }

    /**
     * @Route("/products-delete/{id<\d+>}", name="delete_products")
     */
    public function deleteProduct($id)
    {
        $manager = $this->getDoctrine()->getManager();
        $product = $this->getDoctrine()->getRepository(Product::class)->find($id);

        if (!$product) {
            throw $this->createNotFoundException("Could not retrieve product with id: $id");
        }

        $manager->remove($product);
        $manager->flush();
        return $this->json(["deleted" => "true"]);
    }

    private function getRandomItem()
    {
        // Get an list of random items
        $file_str = file_get_contents("/Users/mac/Symfony_Projects/symf_shop/src/Resources/items.json");
        $items = json_decode($file_str, true);
        $idx = rand(0, count($items["items"]));
        $rand_item = $items["items"][$idx];

        return $rand_item;
    }

    private function getRandomPrice() {
        $rough_price = rand(100, 100000);
        $price = $rough_price + (99 - ($rough_price % 100));
        return $price;
    }
}


