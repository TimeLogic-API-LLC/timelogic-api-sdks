<?php

namespace TimeLogic\Api\WorldTimeApi;

/** HTTP answer, including the X-TimeLogic-Signature* headers when signing is enabled. */
class WorldTimeApiRawResponse
{
    /** @var int */
    public $status;
    /** @var array<string, string> lower-case header names */
    public $headers;
    /** @var string */
    public $body;

    public function __construct($status, array $headers, $body)
    {
        $this->status = (int) $status;
        $this->headers = $headers;
        $this->body = (string) $body;
    }
}
