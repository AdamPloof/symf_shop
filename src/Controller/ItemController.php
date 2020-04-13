<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ItemController extends AbstractController
{
    /**
    * @Route("/")
    */
    public function index()
    {
        $adj = "crazy";
        return $this->render('items/index.html.twig', ['adj' => $adj]);
    }
}
