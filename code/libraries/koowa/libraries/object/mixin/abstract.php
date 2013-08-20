<?php
/**
 * Koowa Framework - http://developer.joomlatools.com/koowa
 *
 * @copyright	Copyright (C) 2007 - 2013 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		http://github.com/joomlatools/koowa for the canonical source repository
 */

/**
 * Abstract Mixin
 *
 * This class does not extend from KObject and acts as a special core class that is intended to offer semi-multiple
 * inheritance features to KObject derived classes.
 *
 * @author  Johan Janssens <https://github.com/johanjanssens>
 * @package Koowa\Library\Object\Mixin
 */
abstract class KObjectMixinAbstract implements KObjectMixinInterface
{
    /**
     * The object doing the mixin
     *
     * @var object
     */
    protected $_mixer;

    /**
     * Class methods
     *
     * @var array
     */
    private $__methods = array();

    /**
     * List of mixable methods
     *
     * @var array
     */
    private $__mixable_methods;

    /**
     * Object constructor
     *
     * @param   KObjectConfig $config Configuration options
     */
    public function __construct(KObjectConfig $config)
    {
        //Initialise
        $this->_initialize($config);

        //Set the mixer
        if(isset($config->mixer)) {
            $this->setMixer($config->mixer);
        }
    }

    /**
     * Initializes the options for the object
     *
     * Called from {@link __construct()} as a first step of object instantiation.
     *
     * @param   KObjectConfig $config Configuration options
     * @return  void
     */
    protected function _initialize(KObjectConfig $config)
    {
        $config->append(array(
            'mixer' => null,
        ));
    }

  	/**
     * Get the mixer object
     *
     * @return KObject The mixer object
     */
    public function getMixer()
    {
        return $this->_mixer;
    }

    /**
     * Set the mixer object
     *
     * @param  KObjectMixable $mixer The mixer object
     * @return KObjectMixinInterface
     */
    public function setMixer(KObjectMixable $mixer)
    {
        $this->_mixer = $mixer;
        return $this;
    }

    /**
     * Mixin Notifier
     *
     * This function is called when the mixin is being mixed. It will get the mixer passed in.
     *
     * @param KObjectMixable $mixer The mixer object
     * @return void
     */
    public function onMixin(KObjectMixable $mixer)
    {
        $this->setMixer($mixer);
    }

    /**
     * Get a handle for this object
     *
     * This function returns an unique identifier for the object. This id can be used as a hash key for storing objects
     * or for identifying an object
     *
     * @return string A string that is unique
     */
    public function getHandle()
    {
        return spl_object_hash( $this );
    }

    /**
     * Get a list of all the available methods
     *
     * This function returns an array of all the methods, both native and mixed in
     *
     * @return array An array
     */
    public function getMethods()
    {
        if(!$this->__methods)
        {
            $methods = array();

            $reflection = new ReflectionClass($this);
            foreach($reflection->getMethods() as $method) {
                $methods[] = $method->name;
            }

            $this->__methods = $methods;
        }

        return $this->__methods;
    }

    /**
     * Get the methods that are available for mixin.
     *
     * Only public methods can be mixed
     *
     * @param KObjectMixable $mixer The mixer requesting the mixable methods.
     * @return array An array of public methods
     */
    public function getMixableMethods(KObjectMixable $mixer = null)
    {
        if(!$this->__mixable_methods)
        {
            $methods = array();

            //Get all the public methods
            $reflection = new ReflectionClass($this);
            foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
                $methods[$method->name] = $method->name;
            }

            //Remove the base class methods
            $reflection = new ReflectionClass(__CLASS__);
            foreach($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method)
            {
                if(isset($methods[$method->name])) {
                    unset($methods[$method->name]);
                }
            }

            $this->__mixable_methods = $methods;
        }

        return $this->__mixable_methods;
    }

    /**
     * Overloaded set function
     *
     * @param  string   $key    The variable name
     * @param  mixed    $value  The variable value.
     * @return mixed
     */
    public function __set($key, $value)
    {
        $this->_mixer->$key = $value;
    }

    /**
     * Overloaded get function
     *
     * @param  string $key The variable name.
     * @return mixed
     */
    public function __get($key)
    {
        return $this->_mixer->$key;
    }

    /**
     * Overloaded isset function
     *
     * Allows testing with empty() and isset() functions
     *
     * @param  string $key The variable name
     * @return boolean
     */
    public function __isset($key)
    {
        return isset($this->_mixer->$key);
    }

    /**
     * Overloaded isset function
     *
     * Allows unset() on object properties to work
     *
     * @param string $key The variable name.
     * @return void
     */
    public function __unset($key)
    {
        if (isset($this->_mixer->$key)) {
            unset($this->_mixer->$key);
        }
    }

    /**
     * Search the mixin method map and call the method or trigger an error
     *
     * @param  string   $method     The function name
     * @param  array    $arguments  The function arguments
     * @throws BadMethodCallException   If method could not be found
     * @return mixed The result of the function
     */
    public function __call($method, $arguments)
    {
        //Make sure we don't end up in a recursive loop
        if(isset($this->_mixer) && !($this->_mixer instanceof $this))
        {
            // Call_user_func_array is ~3 times slower than direct method calls.
            switch(count($arguments))
            {
                case 0 :
                    $result = $this->_mixer->$method();
                    break;
                case 1 :
                    $result = $this->_mixer->$method($arguments[0]);
                    break;
                case 2:
                    $result = $this->_mixer->$method($arguments[0], $arguments[1]);
                    break;
                case 3:
                    $result = $this->_mixer->$method($arguments[0], $arguments[1], $arguments[2]);
                    break;
                default:
                    // Resort to using call_user_func_array for many segments
                    $result = call_user_func_array(array($this->_mixer, $method), $arguments);
             }

            return $result;
        }

        throw new BadMethodCallException('Call to undefined method :'.$method);
    }
}
