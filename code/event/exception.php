<?php
/**
 * Kodekit - http://timble.net/kodekit
 *
 * @copyright   Copyright (C) 2007 - 2016 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license     MPL v2.0 <https://www.mozilla.org/en-US/MPL/2.0>
 * @link        https://github.com/timble/kodekit for the canonical source repository
 */

namespace Kodekit\Library;

/**
 * Exception Event
 *
 * @author  Johan Janssens <https://github.com/johanjanssens>
 * @package Kodekit\Library\Event
 */
class EventException extends Event implements Exception
{
    /**
     * Set the exception
     *
     * @param Exception $exception
     */
    public function setException(\Exception $exception)
    {
        return ObjectConfig::set('exception', $exception);
    }

    /**
     * Get the exception
     *
     * @return Exception
     */
    public function getException()
    {
        return ObjectConfig::get('exception');
    }

    /**
     * Return the error message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->exception->getMessage();
    }

    /**
     * Return the error code
     *
     * @return integer
     */
    public function getCode()
    {
        return $this->exception->getCode();
    }

    /**
     * Return the source filename
     *
     * @return string
     */
    public function getFile()
    {
        return $this->exception->getFile();
    }

    /**
     * Return the source line number
     *
     * @return integer
     */
    public function getLine()
    {
        return $this->exception->getLine();
    }

    /**
     * Return the backtrace information
     *
     * @return array
     */
    public function getTrace()
    {
        return $this->exception->getTrace();
    }

    /**
     * Return the backtrace as a string
     *
     * @return string
     */
    public function getTraceAsString()
    {
        return $this->exception->getTraceAsString();
    }

    /**
     * Returns previous Exception
     *
     * @return \Exception Returns the previous \Exception if available or NULL otherwise.
     */
    public function getPrevious()
    {
        return $this->exception->getPrevious();
    }

    /**
     * Format the error for display
     *
     * @return string
     */
    public function toString()
    {
        return (string) $this->exception;
    }

    /**
     * Cast the object to a string
     *
     * @return string
     */
    final public function __toString()
    {
        return $this->toString();
    }
}