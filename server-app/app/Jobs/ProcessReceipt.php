<?php

namespace App\Jobs;

use App\Services\ReceiptServiService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessReceipt implements ShouldQueue
{
    use Queueable;

    protected $data;
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $receiptServicePdf = new ReceiptServiService();
        $receiptServicePdf->pdfService($this->data);
    }
}
