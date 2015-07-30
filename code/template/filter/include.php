<?php
/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright   Copyright (C) 2007 - 2014 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link        https://github.com/nooku/nooku-framework for the canonical source repository
 */

/**
 * Include Template Filter
 *
 * Filter to parse include tags
 *
 * @author  Johan Janssens <http://github.com/johanjanssens>
 * @package Koowa\Library\Template\Filter
 */
class KemplateFilterInclude extends KTemplateFilterTag
{
    /**
     * Parse the text for style tags
     *
     * @param string $text  The text to parse
     * @return  string
     */
    protected function _parseTags(&$text)
    {
        $matches = array();
        $results = array();
        if(preg_match_all('#<ktml:include\s+src="([^"]+)"(.*)>#iU', $text, $matches))
        {
            foreach(array_unique($matches[1]) as $key => $match)
            {
                //Set required attributes
                $attribs = array(
                    'src' => $match
                );

                $attribs   = array_merge($this->parseAttributes( $matches[2][$key]), $attribs);
                $results[] = $this->_renderTag($attribs);
            }

            $text = str_replace($matches[0], $results, $text);
        }
    }

    /**
     * Render the tag
     *
     * @param   array   $attribs Associative array of attributes
     * @param   string  $content The tag content
     * @return string
     */
    protected function _renderTag($attribs = array(), $content = null)
    {
        $result = '';
        $link   = isset($attribs['src']) ? $attribs['src'] : false;

        if($link)
        {
            $url        = $this->getObject('lib:http.url', array('url' => $link));
            $identifier = $this->getIdentifier($url->toString(HttpUrl::BASE));

            //Include the component
            $result = $this->getObject('com:'.$identifier->package.'.dispatcher.fragment')
                ->include($url);

            if($this->getTemplate()->isDebug())
            {
                $format  = PHP_EOL.'<!--BEGIN ktml:include '.$url.' -->'.PHP_EOL;
                $format .= '%s';
                $format .= PHP_EOL.'<!--END ktml:include '.$url.' -->'.PHP_EOL;

                $result = sprintf($format, trim($result));
            }
        }

        return $result;
    }
}