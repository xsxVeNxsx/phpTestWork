<?php

class Base_Validation
{
    protected $fields_params = [];

    protected function requered($params, $field)
    {
        if (!isset($params[$field]))
            throw new Exception("Requered '".$field."' parameter");
    }

    protected function max_len($params, $field)
    {
        if (strlen($params[$field]) > $this->fields_params[$field]["max_len"])
            throw new Exception("'$field' maximum length is " . $this->fields_params[$field]["max_len"]);
    }

    public function check($params)
    {
        foreach ($this->fields as $field => $validation_rules)
            foreach ($validation_rules as $rule)
                $this->$rule($params, $field);
    }
}
