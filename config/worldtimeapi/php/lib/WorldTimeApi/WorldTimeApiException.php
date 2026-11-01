<?php

namespace TimeLogic\Api\WorldTimeApi;

/**
 * Thrown for any non-2xx answer. getError() is the worldtimeapi.org-style message (for
 * example "unknown location") or the TimeLogic message for authentication and quota errors.
 */
class WorldTimeApiException extends \RuntimeException
{
    /** @var int */
    private $status;
    /** @var string */
    private $error;
    /** @var string|null */
    private $errorCode;
    /** @var string */
    private $body;

    public function __construct($status, $error, $errorCode, $body)
    {
        parent::__construct('WorldTimeAPI-compatible request failed (' . $status . '): ' . $error, (int) $status);
        $this->status = (int) $status;
        $this->error = (string) $error;
        $this->errorCode = $errorCode;
        $this->body = (string) $body;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getError()
    {
        return $this->error;
    }

    /** TimeLogic error code (for example UNAUTHORIZED), or null. */
    public function getErrorCode()
    {
        return $this->errorCode;
    }

    public function getBody()
    {
        return $this->body;
    }

    /** True for the 404 {"error":"unknown location"} answer. */
    public function isUnknownLocation()
    {
        return $this->status === 404 && $this->error === 'unknown location';
    }

    /** True for the 404 {"error":"malformed ip"} answer. */
    public function isMalformedIp()
    {
        return $this->status === 404 && $this->error === 'malformed ip';
    }
}
