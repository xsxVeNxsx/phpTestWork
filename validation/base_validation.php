<?php

class Base_Validation
{
    protected function requered($params, $field)
    {
        if (!isset($params[$field]))
            throw new Exception("Requered '".$field."' parameter");
    }

    public function check($params)
    {
        foreach ($this->fields as $field => $validation_rules)
            foreach ($validation_rules as $rule)
                $this->$rule($params, $field);
    }
}
