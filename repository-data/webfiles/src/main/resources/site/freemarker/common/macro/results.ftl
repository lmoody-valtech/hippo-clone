<#ftl output_format="HTML">
<@hst.setBundle basename="publicationsystem.labels"/>
<#assign formatRestrictableDate="uk.nhs.digital.ps.directives.RestrictableDateFormatterDirective"?new() />

<#macro searchResutls items>
    <#list items as document>
        <#if document.class.name == "uk.nhs.digital.ps.beans.Publication">
            <@publication item=document />
        <#elseif document.class.name == "uk.nhs.digital.ps.beans.Series">
            <@series item=document />
        <#elseif document.class.name == "uk.nhs.digital.ps.beans.Dataset">
            <@dataset item=document />
        </#if>
    </#list>
</#macro>

<#macro publication item>
    <div class="push-double--bottom" data-uipath="ps.search-results.result">
        <h3 class="flush zeta" data-uipath="ps.search-results.result.type" style="font-weight:bold"><@fmt.message key="labels.publication"/></h3>
        <p class="flush">
            <a href="<@hst.link hippobean=item.selfLinkBean/>" title="${item.title}" data-uipath="ps.search-results.result.title">
                ${item.title}
            </a>
        </p>
        <p class="flush zeta" data-uipath="ps.search-results.result.date"><@formatRestrictableDate value=item.nominalPublicationDate/></p>
        <p class="flush" data-uipath="ps.search-results.result.summary"><@truncate text=item.summary.firstParagraph size="300"/></p>
    </div>
</#macro>

<#macro series item>
    <div class="push-double--bottom" data-uipath="ps.search-results.result">
        <h3 class="flush zeta" data-uipath="ps.search-results.result.type" style="font-weight:bold"><@fmt.message key="labels.series"/></h3>
        <p class="flush">
            <a href="<@hst.link hippobean=item.selfLinkBean/>" title="${item.title}" data-uipath="ps.search-results.result.title">
                ${item.title}
            </a>
        </p>
        <p class="flush zeta" data-uipath="ps.search-results.result.date"><@formatRestrictableDate value=item.nominalPublicationDate/></p>
        <p class="flush" data-uipath="ps.search-results.result.summary"><@truncate text=item.summary.firstParagraph size="300"/></p>
    </div>
</#macro>

<#macro dataset item>
    <div class="push-double--bottom" data-uipath="ps.search-results.result">
        <h3 class="flush zeta" data-uipath="ps.search-results.result.type" style="font-weight:bold"><@fmt.message key="labels.dataset"/></h3>
        <p class="flush">
            <a href="<@hst.link hippobean=item.selfLinkBean/>" title="${item.title}" data-uipath="ps.search-results.result.title">
                ${item.title}
            </a>
        </p>
        <p class="flush zeta" data-uipath="ps.search-results.result.date"><@formatRestrictableDate value=item.nominalDate/></p>
        <p class="flush" data-uipath="ps.search-results.result.summary"><@truncate text=item.summary.firstParagraph size="300"/></p>
    </div>
</#macro>