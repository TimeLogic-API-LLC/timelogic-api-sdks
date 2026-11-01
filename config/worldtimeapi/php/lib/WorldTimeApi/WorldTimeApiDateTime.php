<?php

namespace TimeLogic\Api\WorldTimeApi;

/**
 * Time object returned by /api/timezone/{zone} and /api/ip, with the worldtimeapi.org
 * field names and types.
 */
class WorldTimeApiDateTime implements \JsonSerializable
{
    public const FIELDS = [
        'abbreviation', 'client_ip', 'datetime', 'day_of_week', 'day_of_year', 'dst', 'dst_from',
        'dst_offset', 'dst_until', 'raw_offset', 'timezone', 'unixtime', 'utc_datetime', 'utc_offset', 'week_number',
    ];

    /** @var string */ public $abbreviation;
    /** @var string */ public $client_ip;
    /** @var string */ public $datetime;
    /** @var int */ public $day_of_week;
    /** @var int */ public $day_of_year;
    /** @var bool */ public $dst;
    /** @var string|null */ public $dst_from;
    /** @var int */ public $dst_offset;
    /** @var string|null */ public $dst_until;
    /** @var int */ public $raw_offset;
    /** @var string */ public $timezone;
    /** @var int */ public $unixtime;
    /** @var string */ public $utc_datetime;
    /** @var string */ public $utc_offset;
    /** @var int */ public $week_number;

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data)
    {
        $value = new self();
        foreach (self::FIELDS as $field) {
            $value->{$field} = array_key_exists($field, $data) ? $data[$field] : null;
        }
        return $value;
    }

    /** @return array<string, mixed> */
    public function toArray()
    {
        $result = [];
        foreach (self::FIELDS as $field) {
            $result[$field] = $this->{$field};
        }
        return $result;
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize()
    {
        return $this->toArray();
    }
}
