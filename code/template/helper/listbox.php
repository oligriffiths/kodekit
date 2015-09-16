<?php
/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright   Copyright (C) 2007 - 2014 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://github.com/nooku/nooku-framework for the canonical source repository
 */

/**
 * Listbox Template Helper
 *
 * @author  Johan Janssens <https://github.com/johanjanssens>
 * @package Koowa\Library\Template\Helper
 */
class KTemplateHelperListbox extends KTemplateHelperSelect
{
    /**
     * Adds the option to enhance the select box using Select2
     *
     * @param array|KObjectConfig $config
     * @return string
     */
    public function optionlist($config = array())
    {
        $translator = $this->getObject('translator');

        $config = new KObjectConfigJson($config);
        $config->append(array(
            'prompt'    => '- '.$translator->translate('Select').' -',
            'options'   => array(),
            'select2'   => false,
            'attribs'   => array(),
        ));

        if ($config->attribs->multiple && $config->name && substr($config->name, -2) !== '[]') {
            $config->name .= '[]';
        }

        if($config->deselect) {
            $config->options = array_merge(array($this->option(array('label' => $config->prompt))), $config->options->toArray());
        }

        $html = '';

        if ($config->select2)
        {
            $config->append(array(
                'select2_options' => array(
                    'element' => $config->attribs->id ? '#'.$config->attribs->id : 'select[name=\"'.$config->name.'\"]'
                )
            ));

            // special configuration for select2 placeholder
            if ($config->deselect)
            {
                $config->append(array(
                    'select2_options' => array(
                        'options' => array(
                            'placeholder' => array(
                                'id' => '',
                                'text' => $config->prompt
                            ),
                            'allowClear'  => true
                        )
                    )
                ));
            }

            $html .= $this->getTemplate()->createHelper('behavior')->select2($config->select2_options);
        }

        $html .= parent::optionlist($config);

        return $html;
    }

    /**
     * Generates an HTML enabled listbox
     *
     * @param   array   $config An optional array with configuration options
     * @return  string  Html
     */
    public function enabled( $config = array())
    {
        $config = new KObjectConfigJson($config);
        $config->append(array(
            'name'      => 'enabled',
            'attribs'   => array(),
            'deselect'  => true,
        ))->append(array(
            'selected'  => $config->{$config->name}
        ));

        $translator = $this->getObject('translator');
        $options    = array();

        $options[] = $this->option(array('label' => $translator->translate( 'Enabled' ) , 'value' => 1 ));
        $options[] = $this->option(array('label' => $translator->translate( 'Disabled' ), 'value' => 0 ));

        //Add the options to the config object
        $config->options = $options;

        return $this->optionlist($config);
    }

    /**
     * Generates an HTML published listbox
     *
     * @param   array   $config An optional array with configuration options
     * @return  string  Html
     */
    public function published($config = array())
    {
        $config = new KObjectConfigJson($config);
        $config->append(array(
            'name'      => 'enabled',
            'attribs'   => array(),
            'deselect'  => true,
        ))->append(array(
            'selected'  => $config->{$config->name}
        ));

        $translator = $this->getObject('translator');
        $options    = array();
    
        $options[] = $this->option(array('label' => $translator->translate('Published'), 'value' => 1 ));
        $options[] = $this->option(array('label' => $translator->translate('Unpublished') , 'value' => 0 ));
    
        //Add the options to the config object
        $config->options = $options;
    
        return $this->optionlist($config);
    }

    /**
     * Generates an HTML optionlist based on the distinct data from a model column.
     *
     * The column used will be defined by the name -> value => column options in cascading order.
     *
     * If no 'model' name is specified the model identifier will be created using the helper identifier. The model name
     * will be the pluralised package name.
     *
     * If no 'value' option is specified the 'name' option will be used instead. If no 'text'  option is specified the
     * 'value' option will be used instead.
     *
     * @param 	array 	$config An optional array with configuration options
     * @return	string	Html
     * @see __call()
     */
    protected function _render($config = array())
    {
        $config = new KObjectConfig($config);
        $config->append(array(
            'autocomplete' => false
        ));

        if($config->autocomplete) {
            $result = $this->_autocomplete($config);
        } else {
            $result = $this->_listbox($config);
        }

        return $result;
    }

    /**
     * Generates an HTML optionlist based on the distinct data from a model column.
     *
     * The column used will be defined by the name -> value => column options in
     * cascading order.
     *
     * If no 'model' name is specified the model identifier will be created using
     * the helper identifier. The model name will be the pluralised package name.
     *
     * If no 'value' option is specified the 'name' option will be used instead.
     * If no 'label' option is specified the 'value' option will be used instead.
     *
     * @param 	array|KObjectConfig 	$config An optional array with configuration options
     * @return	string	Html
     * @see __call()
     */
    protected function _listbox($config = array())
    {
        $config = new KObjectConfigJson($config);
        $config->append(array(
            'name'       => '',
            'attribs'    => array(),
            'model'      => KStringInflector::pluralize($this->getIdentifier()->package),
            'deselect'   => true,
            'unique'     => true
        ))->append(array(
            'value'      => $config->name,
            'selected'   => $config->{$config->name},
            'identifier' => 'com://'.$this->getIdentifier()->domain.'/'.$this->getIdentifier()->package.'.model.'.$config->model
        ))->append(array(
            'label'      => $config->value,
        ))->append(array(
            'filter'     => array('sort' => $config->label),
        ));

        $list       = $this->getObject($config->identifier)->setState(KObjectConfig::unbox($config->filter))->fetch();

        //Get the list of items
        $items = array();
        foreach($list as $key => $item) {
            $items[$key] = $item->getProperty($config->value);
        }

        if ($config->unique) {
            $items = array_unique($items);
        }

        //Compose the options array
        $options = array();

        foreach ($items as $key => $value)
        {
            $item      = $list->find($key);
            $options[] = $this->option(array('label' => $item->{$config->label}, 'value' => $item->{$config->value}));
        }

        //Compose the selected array
        if($config->selected instanceof KModelEntityInterface)
        {
            $selected = array();
            foreach($config->selected as $entity) {
                $selected[] = $entity->{$config->value};
            }

            $config->selected = $selected;
        }

        //Add the options to the config object
        $config->options = $options;

        return $this->optionlist($config);
    }

    /**
     * Renders a listbox with autocomplete behavior
     *
     * @see    ComKoowaTemplateHelperBehavior::_listbox
     *
     * @param  array|KObjectConfig    $config
     * @return string	The html output
     */
    protected function _autocomplete($config = array())
    {
        $config = new KObjectConfigJson($config);
        $config->append(array(
            'name'     => '',
            'attribs'  => array(
                'id' => 'select2-element-'.mt_rand(1000, 100000)
            ),
            'model'    => KStringInflector::pluralize($this->getIdentifier()->package),
            'validate' => true,
            'prompt'   => '- '.$this->getObject('translator')->translate('Select').' -',
            'deselect' => true,
        ))->append(array(
            'element'    => '#'.$config->attribs->id,
            'options'    => array('multiple' => (bool) $config->attribs->multiple),
            'value'      => $config->name,
            'selected'   => $config->{$config->name},
            'identifier' => 'com://'.$this->getIdentifier()->domain.'/'.$this->getIdentifier()->package.'.model.'.$config->model
        ))->append(array(
            'label'      => $config->value,
        ))->append(array(
            'text'       => $config->label,
            'filter'     => array('sort' => $config->label),
        ));

        if (!$config->url)
        {
            $identifier = $this->getIdentifier($config->identifier);
            $parts      = array(
                'component' => $identifier->package,
                'view'      => $identifier->name,
                'format'    => 'json'
            );

            if ($config->filter) {
                $parts = array_merge($parts, KObjectConfig::unbox($config->filter));
            }

            $config->url = $this->getTemplate()->route($parts, false, false);
        }

        $html = '';

        $html .= $this->getTemplate()->createHelper('behavior')->autocomplete($config);

        $config->attribs->name = $config->name;

        $options = array();

        if ((is_scalar($config->selected) && $config->selected) || count($config->selected))
        {
            $selected = $config->selected;

            if(!$selected instanceof KModelEntityInterface)
            {
                $model     = $this->getObject($config->identifier)->setState(KObjectConfig::unbox($config->filter));
                $selected  = $model->setState(array($config->value => KObjectConfig::unbox($selected)))->fetch();
            }

            foreach($selected as $entity)
            {
                $options[]  = $this->option(array(
                    'value' => $entity->{$config->value},
                    'label' => $entity->{$config->label},
                    'attribs' => array('selected' => true)
                ));
            }
        }

         $html .= $this->optionlist(array(
            'name'     => $config->name,
            'id'       => $config->id,
            'options' => $options,
            'deselect' => false,
            'select2'  => false,
            'attribs'  => $config->attribs
        ));

        return $html;
    }

    /**
     * Search the mixin method map and call the method or trigger an error
     *
     * This function check to see if the method exists in the mixing map if not it will call the 'listbox' function.
     * The method name will become the 'name' in the config array.
     *
     * This can be used to auto-magically create select filters based on the function name.
     *
     * @param  string   $method The function name
     * @param  array    $arguments The function arguments
     * @throws BadMethodCallException   If method could not be found
     * @return mixed The result of the function
     */
    public function __call($method, $arguments)
    {
        if(!in_array($method, $this->getMethods()))
        {
            $config = $arguments[0];
            if(!isset($config['name'])) {
                $config['name']  = KStringInflector::singularize(strtolower($method));
            }

            return $this->_render($config);
        }

        return parent::__call($method, $arguments);
    }
}
