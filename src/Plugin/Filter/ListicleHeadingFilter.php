<?php

namespace Drupal\listicle_heading\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\embed\DomHelperTrait;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * @Filter(
 *   id = "listicle_heading_filter",
 *   title = @Translation("Listicle Heading Filter"),
 *   description = @Translation("Prepares the &lt;h2&gt; listicle heading elements"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 * )
 */
class ListicleHeadingFilter extends FilterBase {

  use DomHelperTrait;

  public function process($text, $langcode) {
    $result = new FilterProcessResult($text);

    if (strpos($text, 'data-number') !== FALSE && strpos($text, 'listicle') !== FALSE) {
      $dom = Html::load($text);
      $xpath = new \DOMXPath($dom);

      foreach ($xpath->query("//h2[contains(@class, 'listicle')]") as $node) {
        /** @var \DOMElement $node */
        $number = $node->getAttribute('data-number');
        $node->nodeValue = "$number. &nbsp;$node->nodeValue";
        $node->removeAttribute('data-number');
      }

      $result->setProcessedText(Html::serialize($dom));
    }

    return $result;
  }
}
