<?php

include_once "validation/base_validation.php";

class Comments_Validation extends Base_Validation
{
    protected $fields_params = ["author" => ["max_len" => 100], "msg" => ["max_len" => 1000]];
    protected $fields = [
        "author" => ["requered", "max_len"],
        "email" => ["requered", "email"],
        "msg" => ["requered", "max_len"]
    ];

    protected function email($params, $field)
    {
        if (!filter_var($params[$field], FILTER_VALIDATE_EMAIL))
            throw new Exception("Uncorrect email format");
    }
}
