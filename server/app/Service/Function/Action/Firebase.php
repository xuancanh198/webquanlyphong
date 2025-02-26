<?php

namespace App\Service\Function\Action;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;

class Firebase
{
    protected $storage;

    public function __construct()
    {
        $this->storage = (new Factory)
            ->withServiceAccount(env('FIREBASE_CREDENTIALS'))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'))
            ->createStorage();
    }

    public function uploadImages(array $images)
    {
        $imageLinks = [];
        foreach ($images as $image) {
            $fileName = time() . '_' . $image->getClientOriginalName();
            $filePath = 'images/' . $fileName;

            try {
                $this->storage->getBucket()->upload(
                    fopen($image->getRealPath(), 'r'),
                    [
                        'name' => $filePath,
                        'predefinedAcl' => 'publicRead',
                    ]
                );
                $imageUrl = sprintf('https://storage.googleapis.com/%s/%s', $this->storage->getBucket()->name(), $filePath);
                $imageLinks[] = $imageUrl;
            } catch (\Exception $e) {
                return false;
            }
        }
        return $imageLinks;
    }

    public function uploadImage($image)
{
    $fileName = time() . '_' . $image->getClientOriginalName();
    $filePath = 'images/' . $fileName;

    try {
        $this->storage->getBucket()->upload(
            fopen($image->getRealPath(), 'r'),
            [
                'name' => $filePath,
                'predefinedAcl' => 'publicRead',
            ]
        );
        $imageUrl = sprintf('https://storage.googleapis.com/%s/%s', $this->storage->getBucket()->name(), $filePath);

        return $imageUrl;
    } catch (\Exception $e) {
        return false;
    }
}

}
