<?php
/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright   Copyright (C) 2007 - 2014 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://github.com/nooku/nooku-framework for the canonical source repository
 */

/**
 * Find the mime type of a file using the PECL FileInfo extension.
 *
 * @link http://php.net/manual/en/book.fileinfo.php
 *
 * @author  Ercan Ozkaya <https://github.com/ercanozkaya>
 * @package Koowa\Library\Filesystem\Mimetype
 */
class KFilesystemMimetypeFileinfo extends KFilesystemMimetypeAbstract
{
    /**
     * Initializes the options for the object
     *
     * Called from {@link __construct()} as a first step of object instantiation.
     *
     * @param  KObjectConfig $config An optional ObjectConfig object with configuration options
     * @return void
     */
    protected function _initialize(KObjectConfig $config)
    {
        $config->append(array(
            'magic_file' => null
        ));

        parent::_initialize($config);
    }

    /**
     * Check if the resolver is supported
     *
     * @return  boolean  True on success, false otherwise
     */
    public static function isSupported()
    {
        return function_exists('finfo_open');
    }

    /**
     * Find the mime type of the given stream
     *
     * @param KFilesystemStreamInterface $stream
     * @return string The mime type or NULL, if none could be guessed
     */
    public function fromStream(KFilesystemStreamInterface $stream)
    {
        $mimetype = null;

        if (static::isSupported())
        {
            if ($finfo = new \finfo(FILEINFO_MIME_TYPE, $this->getConfig()->magic_file))
            {
                if ($path = $stream->getPath()) {
                    $mimetype = $finfo->file($path);
                } else $mimetype = $finfo->buffer($stream->toString());
            }
        }

        return $mimetype;
    }

    /**
     * Find the mime type of the file with the given path.
     *
     * @param string $path The path to the file
     * @return string The mime type or NULL, if none could be guessed
     */
    public function fromPath($path)
    {
        $mimetype = null;

        if (static::isSupported())
        {
            if (!is_file($path)) {
                throw new \RuntimeException('File not found at '.$path);
            }

            if (!is_readable($path)) {
                throw new \RuntimeException('File not readable at '.$path);
            }

            if ($finfo = new \finfo(FILEINFO_MIME_TYPE, $this->getConfig()->magic_file)) {
                $mimetype = $finfo->file($path);
            }
        }

        return $mimetype;
    }
}